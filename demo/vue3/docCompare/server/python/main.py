import os
import requests
import json
from fastapi import FastAPI,Query,Path,HTTPException,File, UploadFile,Form
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()

#   跨域中间件
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/baidu/get_access_token")
def get_baidu_access_token(grant_type:str = Query(title="grant_type"),
                           client_id:str = Query(title="client_id"),
                           client_secret:str = Query(title="client_secret")):
        url = "https://aip.baidubce.com/oauth/2.0/token"
        params = {"grant_type": grant_type, "client_id": client_id, "client_secret": client_secret}
        try:
            response = requests.post(url, params=params)
            return  response.json()
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
        

@app.post("/api/baidu/text_diff/create_task_test")
async def create_baidu_text_diff_task_test(access_token:str = Query(title="access_token")):
    url = "https://aip.baidubce.com/file/2.0/brain/online/v1/textdiff/create_task"
    try:
        base_file_path = "D:\\llm\\0001.docx"
        compare_file_path = "D:\\llm\\0002.docx"
        body = {
            "baseFile": (os.path.basename(base_file_path), open(base_file_path, 'rb'), "multipart/form-data"),
            "compareFile": (os.path.basename(compare_file_path), open(compare_file_path, 'rb'), "multipart/form-data"),
        }
        data = {
            "sealRecognition": False,
            "handWritingRecognition": False
        }
        response = requests.post(f"{url}?access_token={access_token}", data=data, files=body)
        return response.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/baidu/text_diff/create_task")
async def create_baidu_text_diff_task(
    access_token:str = Query(title="access_token"),
    base_file: UploadFile = File(...),
    compare_file: UploadFile = File(...),
    data: str = Form(...)
):
    url = "https://aip.baidubce.com/file/2.0/brain/online/v1/textdiff/create_task"
    try:
        data_dict = json.loads(data)
        body = {
            "baseFile": (base_file.filename, base_file.file.read(), "multipart/form-data"),
            "compareFile": (compare_file.filename, compare_file.file.read(), "multipart/form-data"),
        }
        response = requests.post(f"{url}?access_token={access_token}", data=data_dict, files=body)
        return response.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/baidu/text_diff/query_task_result/{task_id}")
async def query_baidu_text_diff_task_result(
      task_id:str = Path(title="任务Id"),
      access_token:str = Query(title="access_token")):
    url = "https://aip.baidubce.com/file/2.0/brain/online/v1/textdiff/query_task"
    params = {"taskId": task_id}
    try:
        response = requests.post(f"{url}?access_token={access_token}", params=params, files=params)
        return response.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=13141)