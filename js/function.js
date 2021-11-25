
  
       //add-task
  const getLocal=()=>{
    const productJson=localStorage.getItem('task')
    if(productJson!==null){
        return JSON.parse(productJson)
    }
    else{
        return[]
    }
  
  }


  const sortTask=(arr,filters)=>{
    if(filters==='ByEdited'){
      return arr.sort((a,b)=>{
        if(a.updated>b.updated){
          return -1
        }
        if(b.updated>a.updated){
          return 1
        }
        else{
          return 0
        }
      })
    }

    if(filters==='ByCreate'){
      return arr.sort((a,b)=>{
        if(a.created>b.created){
          return -1
        }
        if(b.created>a.created){
          return 1
        }
        else{
          return 0
        }
      })
    }
  }
 const removeTask=(arr,id)=>{
  checkEmpty()
   const removeTask=arr.findIndex((item)=>{
     return item.id===id
   })
   if(removeTask>-1){
     arr.splice(removeTask,1)
   }
 }
  const toggleProduct=(arr,id)=>{
    let toggle=arr.find((item)=>{
       return item.id===id
    })
    if(toggle!==undefined){
      toggle.completd=!toggle.completd

    }
    
  }
  const saveLocal=(arr)=>{
  
    localStorage.setItem('task',JSON.stringify(arr))
  }
  const renderProduct=(arr,filter)=>{
    checkEmpty()
  arr=sortTask(arr,filter.sorts)

    let filteredProducts = arr.filter(function(item) {
      return item.title.toLowerCase().includes(filter.searchItem.toLowerCase())
  })
   
  filteredProducts=filteredProducts.filter((item)=>{
      if(filter.complete){
          return item.completd
      }
      else{
          return true
      }
   })
   document.querySelector('#list').innerHTML=''
   filteredProducts.forEach((element) => {
      
     crateEl(element)
    });
  
  
  }
 
  const crateEl=(item)=>{

        const liEl=document.createElement('li');
        liEl.className='item-todo';
        // right side todo-item
        const divRight=document.createElement('div')
        divRight.className='right';
        const checkBox=document.createElement('input')
        checkBox.className='chk'
        checkBox.checked=!item.completd
        
        checkBox.setAttribute('type','checkbox')
        const spanCheckBox=document.createElement('span')
        const labelCheckBox=document.createElement('label')
        const pEl=document.createElement('p')
        pEl.className='task-title'
        pEl.innerHTML=`${item.title}`
         
        divRight.appendChild(labelCheckBox)
        labelCheckBox.appendChild(checkBox)
        labelCheckBox.appendChild(spanCheckBox)
        divRight.appendChild(pEl);
        // left side todo-item
        const divLeft=document.createElement('div')
        divLeft.className='left'
        const pElRemove=document.createElement('p')
        pElRemove.className='remove'
        pElRemove.innerHTML='<i class="far fa-trash-alt"></i>'
        const aEl=document.createElement('a')
        aEl.className='edit';
        aEl.innerHTML='<i class="far fa-edit"></i>'
        aEl.setAttribute('href',`./edit.html#${item.id}`)
        divLeft.appendChild(pElRemove)
        divLeft.appendChild(aEl)
        //
        liEl.appendChild(divRight)
        liEl.appendChild(divLeft)
        // 
        listTodo.appendChild(liEl)
      if(checkBox.checked){
        pEl.style.textDecoration='line-through'
      }
           
    
        checkBox.addEventListener('change',(e)=>{
         
          toggleProduct(todoList,item.id)
          saveLocal(todoList)
          renderProduct(todoList,filter)
         
      
         
        })
        pElRemove.addEventListener('click',(e)=>{
          removeTask(todoList,item.id)
          saveLocal(todoList)
          renderProduct(todoList,filter)
        })
        return listTodo
      
  }
  const editTime=(timestamp)=>{
    return moment(timestamp).locale('fa').fromNow()
  }