const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const deleteBtn = document.querySelectorAll(".delete__comment");

const addComment = (text, id)=>{
    const videoComments = document.querySelector(".video__comments ul");
    const newComment = document.createElement("li");
    newComment.dataset.id=id;
    newComment.className = "video__comment";
    const icon = document.createElement("i");
    icon.className = "fas fa-comment";
    const span = document.createElement("span");
    span.innerText = ` ${text} `;
    const spanX = document.createElement("span");
    spanX.className = "delete__comment";
    const xIcon = document.createElement("i");
    spanX.classList.add("delete__comment");
    xIcon.className = "fas fa-remove";
    spanX.appendChild(xIcon);
    newComment.appendChild(icon);
    newComment.appendChild(span);
    newComment.appendChild(spanX);
    videoComments.prepend(newComment);

    spanX.addEventListener("click",handleDeleteComment);
}

const handleSubmit=  async (event) =>{
    event.preventDefault();
    const textarea = form.querySelector("textarea");
    const text = textarea.value;
    const videoId = videoContainer.dataset.id;
    if(text === ""){
        return;
    }
    const response = await fetch(`/api/videos/${videoId}/comment`,{
        method : "POST",
        headers:{
            "Content-Type" :"application/json",
        },
        body : JSON.stringify({text}),
    });
    const responseData = await response.json();
    if(response.status === 201)
    textarea.value = "";
    {
        addComment(text, responseData.newCommentId);
    }
};

const handleDeleteComment = async(event)=>{
    //event.preventDefault(); //없애야되는건가?
    const deletedComment = event.target.parentNode;
    const videoId = videoContainer.dataset.id;
    const {dataset:{id}} = deletedComment;    
    const response = await fetch(`/api/comments/${id}/delete`,{
        method : "DELETE",
        headers:{
            "Content-Type" : "application/json"
        },
        body:JSON.stringify({
            id,
            videoId
        })
    });

    if(response.status === 200){
        deletedComment.remove();
    }
}

if(form){
    form.addEventListener("submit", handleSubmit);
}


if(deleteBtn)
{
    deleteBtn.forEach((btn)=>{
        btn.addEventListener("click",handleDeleteComment);
    })
}