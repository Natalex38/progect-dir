import './App.css';
import React, {useState} from 'react';

const listDir =[
{name: 'папка1', id: 1, parent: null },
{name: 'папка2', id: 2, parent: null,},
{name: 'папка1.1', id: 3, parent: 1, },
{name: 'папка2.2', id: 4, parent: 2,},
{name: 'папка2.1', id: 5, parent: 2 },
{name: 'папка1.1.1', id: 6, parent: 3, }
];


export default function App() {

const[openedFolder,setOpenedFolder]=useState([]);
const[state,setState]=useState(false);
const[stateDel,setStateDel]=useState(false);
const openFolder = id => {
if(openedFolder.includes(id)){
setOpenedFolder(openedFolder.filter(e => e !== id))
} else {
setOpenedFolder([...openedFolder,id])
}
};

const RenderFolder = ({item}) => {

const children = listDir.filter(dir => dir.parent === item.id);

return <li>
<span onClick={() => children.length && openFolder(item.id)}>{item.name}</span>
<button onClick={() =>setState(item.id)} class="zatemnenie">добавить элемент в {item.name}</button>
<button onClick={() =>setStateDel(item.id)}>удалить {item.name}</button>
{children.length && openedFolder.includes(item.id) && <ul>
{children.map(child => <RenderFolder item={child} />)}
</ul>}
</li>;
};

return (<div>
<ul className="App">
{listDir.filter(item => item.parent === null).map(item => <RenderFolder item={item} />)}
</ul>
{state!==false &&<Modal item={state} />}
{stateDel!==false && <ModalDel itemDel={stateDel} />}
</div>
);

function Modal({item}){
let removeModal= ()=>{
setState(null);
}
if(item) {
let elimList= React.createRef();
let add= ()=>{
let namelist =elimList.current.value;
if(namelist){
listDir.push({name: namelist, id: listDir.length + 1, parent: item})
elimList.current.value=null;
openFolder(item.id);
setState(null);}
else alert("нельзя создать элемент без имени");
}
return (<div className="zatemnenie"><div className="modal">
<div сlassName="ModalWindow">
<div className="ModalHead">
<div className='modalTitle'>Добавление дикертории</div>
</div>
<div className="ModalBody">
<textarea placeholder='Имя нового элемента' class='addList' ref ={elimList}></textarea>
</div>
<div className="ModalFooter">
<button className="ModalButon" onClick={add}>добавить в списов</button>
<button onClick={removeModal}>отмена</button>
</div>
</div>
</div></div>);
}
return null;
};


function ModalDel({itemDel}){
  console.log(itemDel);
  let item = listDir.filter(elem=> elem.id==itemDel)[0];
  console.log(item);
  function childrenDel(item){//функция удаления всех дочерних элементов
  let children = listDir.filter(itemdir => itemdir.parent === item.id);
  if(listDir.filter(itemdel => itemdel.parent === item.id).length)
  children.map(childe=>childrenDel(childe));//рекурсия по дочерним элементам
  children.map(itemdel => delete listDir[itemdel.id-1])
  }

  let removeModal= ()=>{
    setStateDel(null);
  }
  if(item) {
  let deleteDir= ()=>{
  if(listDir.filter(itemdir => itemdir.parent === item.id))childrenDel(item);
  delete listDir[item.id-1];
  console.log(listDir);
  openFolder(item.id);
  }
  return (<div class="zatemnenie"><div class="modal">
     <div ClassName="ModalWindow">
         <div ClassName="ModalHead">
            <div className='modalTitle'>Вы точно хотите удалить {item.name}</div>
         </div>
         <div ClassName="ModalFooter">
         <button className="ModalButon" onClick={deleteDir}>Удалить</button>
         <button onClick={removeModal}>Отмена</button>
         </div>
     </div>
  </div></div>);
}return null;
};

}
