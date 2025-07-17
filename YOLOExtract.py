from ultralytics import YOLO
import cv2
import numpy as np

class YoloCropper:
    def __init__(self, model_path: str):
        self.model = YOLO(model_path)

    def detect_and_crop_highest_conf(self, image):
        results = self.model(image)[0]
        best_box = None
        highest_conf = 0

        for box in results.boxes:
            conf = float(box.conf[0])
            if conf > highest_conf:
                highest_conf = conf
                best_box = box

        if best_box is None:
            raise ValueError("No object detected.")

        x1, y1, x2, y2 = map(int, best_box.xyxy[0])
        cropped = np.array(image[y1:y2, x1:x2])
        return cropped

if __name__ == "__main__":
    model_path = "Yolo/deepfashion2_yolov8s-seg.pt"
    image_path = "Yolo/test.jpg"
    image = cv2.imread(image_path)
    cropper = YoloCropper(model_path)
    result = cropper.detect_and_crop_highest_conf(image)
    print(result.shape)
    cv2.imwrite('Yolo/result.jpg', result)
