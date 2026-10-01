/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  cloudinary: {
    createUploadWidget: (
      config: Record<string, unknown>,
      callback: (error: unknown, result: CloudinaryUploadResult | undefined) => void,
    ) => { open: () => void };
  };
}

interface CloudinaryUploadResult {
  event: string;
  info?: { secure_url?: string };
}