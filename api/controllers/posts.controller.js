import prisma from "../lib/prisma.js";
import jwt from 'jsonwebtoken'

export const getPosts = async (req, res) => {
	const query = req.query;
	try {
		const posts = await prisma.post.findMany({
			where: {
				city: query.city || undefined,
				type: query.type || undefined,
				property: query.property || undefined,
				bedroom: parseInt(query.bedroom) || undefined,
				price: {
					gte: parseInt(query.minPrice) || undefined,
					lte: parseInt(query.maxPrice) || undefined,
				},
			},
		})
		res.status(200).json(posts);

	} catch (error) {
		console.error("Error fetching posts:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
}

export const getPost = async (req, res) => {
	const postId = req.params.id;
	try {
		const post = await prisma.post.findUnique({
			where: { id: postId },
			include: {
				postdetail: true,
				user: {
					select: {
						id: true,
						username: true,
						avatar: true,
					}
				},
			},
		});

		const token = req.cookies.token
    
        if(!token) {
            return res.status(401).json("token not found")
        }

		let id

		jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
			if(err) return res.status(401).json({message : "Invalid Token"})
			id = payload.id		
		})

		const isSaved = await prisma.savedPost.findUnique({
				where: {
					userId_postId: {
						userId: id,
						postId,
					},
				},
			})

		res.status(200).json({...post, isSaved: !!isSaved });
	} catch (error) {
		console.error("Error fetching post:", error);
		return res.status(500).json({ message: "Internal Server Error" });
	}

}

export const getMyPosts = async (req,res) => {
	const tokenid = req.user.id
	try {
		const posts = await prisma.post.findMany({
			where: { userId: tokenid }			
		});
		res.status(200).json(posts);
	} catch (error) {
		console.error("Error fetching user's posts:", error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
}

export const createPost = async (req, res) => {
	const { postData, postdetail } = req.body;

	const tokenid = req.user.id
	try {
		const newPost = await prisma.post.create({
			data: {
				...postData,
				userId: tokenid,
				postdetail: {
					create: postdetail,
				}
			},
		});
		res.status(201).json(newPost);
	} catch (error) {
		console.error("Error creating post:", error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
}

export const updatePost = (req, res) => {
	const { id } = req.params;
	res.status(200).json({ message: `Post with id ${id} updated successfully` });
}

export const deletePost = async (req, res) => {
	const { id } = req.params;
	const tokenid = req.user.id
	try {
		const post = await prisma.post.findUnique({
			where: { id },
		});

		if (!post) {
			return res.status(404).json({ message: "Post not found" });
		}

		if (post.userId !== tokenid) {
			return res.status(403).json({ message: "You are not authorized to delete this post" });
		}

		await prisma.post.delete({
			where: { id },
		});

		res.status(200).json({ message: `Post with id ${id} deleted successfully` });
	} catch (error) {
		console.error("Error deleting post:", error);
		return res.status(500).json({ message: "Internal Server Error" });

	}

}

export const toggleSavePost = async (req, res) => {
  const postId = req.params.id;
  const tokenid = req.user?.id;

  if(!tokenid) {
	return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const existingSavedPost = await prisma.savedPost.findUnique({
      where: {
        userId_postId: {
          userId: tokenid,
          postId: postId,
        },
      },
    });

    if (existingSavedPost) {
      await prisma.savedPost.delete({
        where: {
          userId_postId: {
            userId: tokenid,
            postId: postId,
          },
        },
      });

      return res.status(200).json({ message: "Post unsaved successfully" });
    } else {
      const newSavedPost = await prisma.savedPost.create({
        data: {
          userId: tokenid,
          postId: postId,
        },
      });

      return res.status(200).json({ message: "Post saved successfully", data: newSavedPost });
    }
  } catch (error) {
    console.error("Error toggling saved post:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getMySavedPosts = async (req, res) => {
	const tokenid = req.user.id;
	try {
		const savedPosts = await prisma.savedPost.findMany({
			where: { userId: tokenid },
			include: {
				post: true,			
			},
		});
		res.status(200).json(savedPosts);
	} catch (error) {
		console.error("Error fetching saved posts:", error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
}
