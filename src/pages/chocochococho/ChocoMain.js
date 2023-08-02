import React, { useRef, useState } from 'react';
import './choco.css';
//img
import mainTitle from'../../assets/img/tit.jpg';//타이틀
import todoTitle from'../../assets/img/sub_tit1.jpg';//todo 타이틀
import doneTitle from'../../assets/img/sub_tit2.jpg';//done 타이틀
import kirby from'../../assets/img/kirby.jpg';//kirby 상단

const ChocoMain = () => {

    const addInput = useRef();
    // todo List
    let [todoData, setTodoData] = useState(['todo 1', 'todo 2', 'todo 3']);
    // done List
    let [doneData, setDoneData] = useState(['done 1', 'done 2', 'done 3']);
    // input text
    const [inputValue, setInputValue] = useState('');

    //todo list 생성
    const todoEvent = () => {
        if(todoData.length > 0){
            const todoListMake = todoData.map((e, idx) => {
            return (
                <li key={idx} id={`todo_${idx}`}>
                    <strong onClick={() => {goDone(idx)}}>{e}</strong>
                    <i onClick={() => {todoDelete(idx)}}></i>
                </li>
                )
            })
            return <>{todoListMake}</>
        }else{
            return null;
        }
    }

    //done list 생성
    const doneEvent = () => {
        if(doneData.length > 0){
            const doneListMake = doneData.map((e, idx) => {
            return (
                <li key={idx} id={`done_${idx}`}>
                    <strong onClick={() => {reTodo(idx)}}>{e}</strong>
                    <i onClick={() => {doneDelete(idx)}}></i>
                </li>
                )
            })
            return <>{doneListMake}</>
        }else{
            return null;
        }
    }

    //done -> todo 영역으로 리스트 이동
    const reTodo = (idx) => {
        if (doneData.length > 0) {            
            setTodoData((prev) => [...prev, doneData[idx]]);
            const updatedDoneData = [...doneData];
            updatedDoneData.splice(idx, 1);
            setDoneData(updatedDoneData);
        }
    }

    //todo -> done 영역으로 리스트 이동
    const goDone = (idx) => {
        if (todoData.length > 0) {            
            setDoneData((prev) => [todoData[idx], ...prev]);
            const updatedTodoData = [...todoData];
            updatedTodoData.splice(idx, 1);
            setTodoData(updatedTodoData);
        }
    }

    //todo 추가
    const addTodo = () => {
        if (inputValue.trim() !== '') {
            console.log(inputValue, 'todo 추가')
            setTodoData((prev) => [inputValue, ...prev]);
            setInputValue('');
            addInput.current.value = ''
        }
    }

    //todo 추가 상태 업데이트
    const handleChange = (event) => {
        const value = event.target.value;
        console.log(value); // 입력 값 확인
        setInputValue(value); // 상태 업데이트
    };

    //todo list 삭제
    const todoDelete = (idx) => {
        const updatedTodoData = [...todoData];
        updatedTodoData.splice(idx, 1);
        setTodoData(updatedTodoData);
    }

    //done list 삭제
    const doneDelete = (idx) => {
        const updatedDoneData = [...doneData];
        updatedDoneData.splice(idx, 1);
        setDoneData(updatedDoneData);
    }

    return (
        <div className="choco_area">
            <div className='wrap'>
                <h2>
                    <img src={mainTitle} alt="메인 타이틀"/>
                </h2>
                <div className='list_wrap'>
                    <div className='todo_area'>
                    <img src={todoTitle} alt="todo 타이틀"/>
                        <div className='todo_list'>
                            <form>
                                <input ref={addInput} className="add_box" type="text" onChange={handleChange}/>
                                <button type="button" onClick={addTodo}>등록</button>
                            </form>
                            <ul>
                            {todoEvent()}
                            </ul>
                        </div>
                    </div>
                    <div className='done_area'>
                    <img src={doneTitle} alt="done 타이틀"/>
                        <div className='done_list'>
                            <img src={kirby} alt="kirby 상단"/>
                            <ul>
                            {doneEvent()}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChocoMain;