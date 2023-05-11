import { createMulterParser } from "../../../utils/parser";

const multerPictureParser = createMulterParser("uploads", "profile_picture", ["png", "jpeg", "jpg"]);

const uploadProfilePictureMiddlewares = [multerPictureParser];

export { uploadProfilePictureMiddlewares };