from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import Response
from pydantic import BaseModel
from YOLOExtract import YoloCropper
from DinoExtract import DinoRecognition
from VecDB import FaissIndexer
import numpy as np
import cv2
from PIL import Image
import requests

app = FastAPI()

# Initialize your modules with correct paths and dimensions
yolo_model = YoloCropper(model_path="Yolo/deepfashion2_yolov8s-seg.pt")
dino_model = DinoRecognition()
vecdb = FaissIndexer(dim=1024)  # DINO large outputs 1024-dim embeddings
vecdb.load_index("FashionIdx.index")  # Load existing index if available    
# Request schemas
class SearchByUrlRequest(BaseModel):
    url: str
    top_k: int = 10

# Endpoints
@app.post("/search_by_url")
async def search_by_url(req: SearchByUrlRequest):
    # Step 1: Download image
    try:
        resp = requests.get(req.url)
        resp.raise_for_status()
        img_bytes = resp.content
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to download image: {e}")

    # Step 2: Decode image for OpenCV
    np_arr = np.frombuffer(img_bytes, np.uint8)
    img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
    if img is None:
        raise HTTPException(status_code=400, detail="Invalid image file from URL")

    # Step 3: YOLO crop
    try:
        cropped = yolo_model.detect_and_crop_highest_conf(img)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"YOLO crop failed: {e}")

    # Step 4: Convert to PIL for DINO
    pil_crop = Image.fromarray(cv2.cvtColor(cropped, cv2.COLOR_BGR2RGB))

    # Step 5: DINO embedding
    embeddings = dino_model.extract_feature([pil_crop])
    if embeddings is None:
        raise HTTPException(status_code=500, detail="Feature extraction failed")
    print(embeddings)
    # Step 6: FAISS search
    query = np.array([embeddings[0]], dtype=np.float32)
    try:
        results = vecdb.search(query, req.top_k)
        return {"results": [{"id": rid, "score": float(score)} for rid, score in results]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"FAISS search failed: {e}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("APIBackend:app", host="0.0.0.0", port=8000, reload=True)
