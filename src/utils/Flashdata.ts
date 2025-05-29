export function setFlashdata(data: string){
    window.sessionStorage.setItem("flashdata", data);
}

export function getFlashdata(){
    const flashdata = window.sessionStorage.getItem("flashdata");
    window.sessionStorage.removeItem("flashdata");
    return flashdata || "";
}