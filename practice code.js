let pro=document.querySelectorAll('.prob')
let problem=document.querySelectorAll('.problems')
pro.forEach(i=>{
    i.addEventListener('click',()=>{
        problem.forEach(j=>{
            if(i.attributes['data-item'].value==j.attributes['data-filter'].value){
                j.style.display="block"
            }
            else{
             j.style.display="none"
            }
        })
    })
})