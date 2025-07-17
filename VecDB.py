import faiss
import numpy as np
import pickle
class FaissIndexer:
    def __init__(self, dim: int, index_path="FashionIdx.index"):
        """
        dim: kích thước vector embedding
        """
        self.dim = dim
        try:
            self.index = faiss.read_index("flat_l2_custom.index")
        except:
            self.index = faiss.IndexFlatIP(dim)  # Inner Product = Cosine nếu normalized
        self.id_map = {}  # map từ internal index → item_id (hoặc filename...)
    
    def add(self, vectors: np.ndarray, ids: list):
        """
        vectors: ndarray shape (n_samples, dim)
        ids: danh sách tên hoặc id để ánh xạ
        """
        self.index.add(vectors)
        for i, id in enumerate(ids):
            self.id_map[self.index.ntotal - len(ids) + i] = id  # lưu mapping

    def search(self, query: np.ndarray, top_k: int = 5):
        """
        query: vector đầu vào (shape: [1, dim])
        Return: danh sách (id, score)
        """
        distances, indices = self.index.search(query, top_k)
        results = []
        for idx, score in zip(indices[0], distances[0]):
            if idx in self.id_map:
                results.append((self.id_map[idx], score))
        return results

    def save_index(self,index_path):
        faiss.write_index(self.index,index_path)
        with open("id_map.pkl", "wb") as f:
            pickle.dump(self.id_map, f)
    def load_index(self,index_path):
        self.index = faiss.read_index(index_path)
        with open("id_map.pkl", "rb") as f:
            self.id_map = pickle.load(f)
    def reset(self):
        """Xóa toàn bộ chỉ mục"""
        self.index.reset()
        self.id_map = {}