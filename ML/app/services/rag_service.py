import json
import chromadb
from chromadb.utils import embedding_functions

client = chromadb.Client()

embedding_function = embedding_functions.DefaultEmbeddingFunction()

collection = client.get_or_create_collection(
    name="cognitive_knowledge",
    embedding_function=embedding_function
)


def load_data():
    with open("data/knowledge.json") as f:
        return json.load(f)


def initialize_db():
    data = load_data()

    if collection.count() > 0:
        return

    documents = [item["content"] for item in data]
    ids = [item["id"] for item in data]
    metadatas = [{"topic": item["topic"]} for item in data]

    collection.add(
        documents=documents,
        ids=ids,
        metadatas=metadatas
    )


initialize_db()


def search_docs(query, k=3):
    results = collection.query(
        query_texts=[query],
        n_results=k
    )

    return results["documents"][0]