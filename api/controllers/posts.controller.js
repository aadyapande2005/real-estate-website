import prisma from "../lib/prisma.js";

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
	const { id } = req.params;
	try {
		const post = await prisma.post.findUnique({
			where: { id },
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
		res.status(200).json(post);
	} catch (error) {
		console.error("Error fetching post:", error);
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
