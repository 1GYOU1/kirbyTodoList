import React, { useRef, useState } from 'react';
import './choco.css';
//img
import mainTitle from'../../assets/img/tit.jpg';//타이틀
import todoTitle from'../../assets/img/sub_tit1.jpg';//todo 타이틀
import doneTitle from'../../assets/img/sub_tit2.jpg';//done 타이틀
import kirby from'../../assets/img/kirby.jpg';//kirby 상단
import qMark from'./img/q_mark.png';//물음표

const ChocoMain = () => {

    const addInput = useRef();
    const kirbyAct = useRef();
    const allClearBtn = useRef();
    const qMarkArea = useRef();
    // todo List
    let [todoData, setTodoData] = useState(['todo 1', 'todo 2', 'todo 3']);
    // done List
    let [doneData, setDoneData] = useState([]);
    // input text
    const [inputValue, setInputValue] = useState('');
    const [editValue, setEditValue] = useState('');
    const [editEvent, setEditEvent] = useState(false);
    const [editIdx, setEditIdx] = useState(null);

    //todo list 생성
    const todoEvent = () => {
        if(todoData.length > 0){
            const todoListMake = todoData.map((e, idx) => {
            return (
                <li key={idx} id={`todo_${idx}`}>
                    {editEvent && idx === editIdx ? (
                        <input
                        type="text"
                        value={editValue}
                        onChange={editing}
                        onKeyUp={editKey}
                    />
                    ) : (
                        <strong onClick={() => {goDone(idx)}}>{e}</strong>
                    )}
                    {editEvent ? (
                        <i className="edit" onClick={() => {endEdit(idx)}}></i>
                    ) : (
                        <i className="edit" onClick={() => {todoEdit(idx)}}></i>
                    )}
                    <i onClick={() => {todoDelete(idx)}}></i>
                </li>
                )
            })
            return <>{todoListMake}</>
        }else{
            return null;
        }
    }
    
    //todo list 수정
    const todoEdit = (idx) => {
        console.log(idx,'번째 배열 수정중 ~')
        setEditEvent(true);
        setEditIdx(idx);
    };

    //todo list 수정중
    const editing = (event) => {
        setEditValue(event.target.value);
    }

    //todo list 수정완료
    const endEdit = (idx) => {
        if(idx === editIdx){//눌렀던 수정 버튼만 가능
            setTodoData((prev) => {
                const updatedTodoData = [...prev];
                updatedTodoData[idx] = editValue;
                return updatedTodoData;
            });
            setEditEvent(false);
            setEditValue(''); // 수정이 완료되면 editValue를 초기화
        }
    };

    //todo 수정 input 작성 후 'Enter'키로 등록
    const editKey = (event) => {
        if (event.key === 'Enter') {
            setTodoData((prev) => {
                const updatedTodoData = [...prev];
                updatedTodoData[editIdx] = editValue;
                return updatedTodoData;
            });
            setEditEvent(false);
            setEditValue(''); // 수정이 완료되면 editValue를 초기화
            console.log(';test')
        }
    };

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

    //todo 추가, input 비우기
    const addTodo = () => {
        if (inputValue.trim() !== '') {
            console.log(inputValue, 'todo 추가')
            setTodoData((prev) => [inputValue, ...prev]);
            setInputValue('');
            addInput.current.value = ''
        }
    }

    //todo 등록 input 작성 후 'Enter'키로 등록
    const addKey = (event) => {
        event.preventDefault(); // 폼 제출 기본 동작 막기
        if (event.key === 'Enter') {
            console.log('엔터키로 추가')
            addTodo();
        }
    };

    //todo 추가 상태 업데이트
    const addInputChange = (event) => {
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

    //done list 모두 삭제
    const allClear = () => {
        if (doneData.length > 0) { 
            kirbyAct.current.classList.add('on');
            setTimeout(() => {
                const allClearDoneData = [...doneData];
                allClearDoneData.splice(0, doneData.length);
                setDoneData(allClearDoneData);
            }, 2500);
            setTimeout(() => {
                kirbyAct.current.classList.remove('on');
            }, 4000);
        }else{
            qMarkArea.current.style.display = 'block';
            setTimeout(() => {
                qMarkArea.current.style.display = 'none';
            }, 2000);
        }
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
                            <form onSubmit={(e) => e.preventDefault()}>
                                <input ref={addInput} className="add_box" type="text" onChange={addInputChange} onKeyUp={addKey}/>
                                <button type="button" onClick={addTodo}>Add</button>
                            </form>
                            <ul>
                                {todoEvent()}
                            </ul>
                        </div>
                    </div>
                    <div className='done_area'>
                        <button ref={allClearBtn} type="button" onClick={allClear}>All Clear</button>
                        <div ref={qMarkArea} className="qmark_box">
                            <img src={qMark} alt='물음표'/>
                            <img src={qMark} alt='물음표'/>
                            <img src={qMark} alt='물음표'/>
                        </div>
                        <img src={doneTitle} alt="done 타이틀"/>
                        <div className='done_list'>
                            <img src={kirby} alt="kirby 상단"/>
                            <ul ref={kirbyAct}>
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