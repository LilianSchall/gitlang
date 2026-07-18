import fastapi
import uvicorn
import sentence_transformers

app = fastapi.FastAPI()

"""
The following method should be a websocket endpoint for retrieval of a
vocabulary in a certain language.
We need to open a connection to the sqlite database, charge a sentence transformer
like all-mini-lm-v6, then read the input given by the client, compute the embedding
and return the closest words in the vocabulary.
The vocabulary stored in the duckdb database with the dataclass found in domain module.
"""
@app.websocket("/vocabulary/{language}")
async def get_vocabulary(websocket: fastapi.WebSocket, language: str):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()

    except fastapi.WebSocketDisconnect:
        print("Client disconnected")




if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
