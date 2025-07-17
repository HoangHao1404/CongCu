import os
import cv2
from PIL import Image

from YOLOExtract import YoloCropper
from DinoExtract import DinoRecognition
from VecDB import FaissIndexer

IMAGE_DIR = "downloaded_images"
YOLO_MODEL_PATH = "Yolo/deepfashion2_yolov8s-seg.pt"
FAISS_INDEX_PATH = "FashionIdx.index"

def main():
    # Initialize modules
    cropper = YoloCropper(YOLO_MODEL_PATH)
    dino = DinoRecognition()

    # Gather image paths
    image_files = [
        os.path.join(IMAGE_DIR, f)
        for f in os.listdir(IMAGE_DIR)
        if f.lower().endswith(('.jpg', '.jpeg', '.png','.webp'))
    ]

    cropped_images = []
    valid_filenames = []

    # Crop each image using YOLO
    for img_path in image_files:
        try:
            img = cv2.imread(img_path)
            crop = cropper.detect_and_crop_highest_conf(img)
            pil_crop = Image.fromarray(cv2.cvtColor(crop, cv2.COLOR_BGR2RGB))
            cropped_images.append(pil_crop)
            valid_filenames.append(os.path.basename(img_path))
        except Exception as e:
            print(f"Skipping {img_path}: {e}")

    # Extract DINO embeddings
    if not cropped_images:
        print("No valid crops found.")
        return

    embeddings = dino.extract_feature(cropped_images)
    if embeddings is None:
        print("Embedding extraction failed.")
        return

    # Save to FAISS index
    dim = embeddings.shape[1]
    indexer = FaissIndexer(dim, FAISS_INDEX_PATH)
    indexer.add(embeddings, valid_filenames)
    indexer.save_index(FAISS_INDEX_PATH)
    print(f"Indexed {len(valid_filenames)} images to {FAISS_INDEX_PATH}")

if __name__ == "__main__":
    main()