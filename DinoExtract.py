import torch
from transformers import AutoModel, AutoImageProcessor
class DinoRecognition:
    def __init__(self):
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        
        # Load DINO-ViTS8 model and processor
        self.model_name = "facebook/dinov2-large"
        self.model = AutoModel.from_pretrained(self.model_name).to(self.device)
        self.model.eval()
        self.processor = AutoImageProcessor.from_pretrained(
            self.model_name,
            use_fast=True,
            size={"height": 518, "width": 518}
        )
    def extract_feature(self,images):
        """
        Input:
            - image: ảnh đầu vào (PIL.Image hoặc numpy)
            - model: mô hình DINO-ViT đã load
            - transform: pipeline transform phù hợp với DINO
            - device: 'cuda' hoặc 'cpu'
        
        Process:
            - Áp dụng transform lên ảnh
            - Thêm batch dimension và chuyển lên device
            - Truyền qua model để lấy embedding
        
        Output:
            - Trả về vector embedding (tensor hoặc numpy array)
        """

        try:
            if not isinstance(images, list):
                images = [images]

            # Đảm bảo tất cả ảnh là RGB (PIL)
            images = [img.convert("RGB") for img in images]

            inputs = self.processor(images=images, return_tensors="pt").to(self.device)
            with torch.no_grad():
                outputs = self.model(**inputs)
                embeddings = outputs.last_hidden_state[:, 0, :]  # CLS token
                embeddings = torch.nn.functional.normalize(embeddings, p=2, dim=1)  # normalize để dùng cosine
                return embeddings.cpu().numpy()

        except Exception as e:
            print(f"[ERROR] Feature extraction failed: {e}")
            return None