export const AddImage = async (image) => {//получаем изображение в виде блоба
    console.log(image)
    let promise = new Promise((resolve, reject) => {//конвертируем blob в base64
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = function () {
            resolve(reader.result);
        }
    })
    const base64data = await promise;
    return `<div contenteditable="false" style="display: flex; justify-content: center"><img src="${base64data}"/></div><span>${image.name}</span>`
}

export const normalText = () => {//получаем изображение в виде блоба
    return `<span>хуй</span>`
}
export const BoldText = () => {//получаем изображение в виде блоба
    return `<b style="color:red">хуй</b>`
}