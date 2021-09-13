import React, { useState, useEffect, useRef } from "react";
import "../../css/Todo/TodoCreate.css";
import axios from "axios";

const TodoCreate = ({ list, setList, today, id }) => {
    const [on, setOn] = useState(true);
    const [off, setOff] = useState(false);
    let t_board = list.length;

    const onToggle = () => {
        if (on === true) {
            setOn(false);
            setOff(true);
        } else {
            setOn(true);
            setOff(false);
        }
    };

    const [text, setText] = useState("");
    const handleChange = (e) => {
        setText(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            save();
        }
    };

    let newArr = [...list];
    const save = () => {
        if (text === "") {
            alert("내용을 입력해 주세요!");
            return;
        }
        if (t_board !== 0) {
            t_board = list[list.length - 1].t_board;
        }
        newArr.push({
            i_user : id,
            t_board: t_board + 1,
            t_text: text,
            done: false,
            regdt: today,
        });
        setList(newArr);
        console.log(newArr);
    };

    useEffect(() => {
        axios({
            url: "/api/todo/insert",
            method: "post",
            data: {
                list,
            },
        })
            .then((response) => {
                console.log("Todo 추가/삭제");
            })
            .catch((err) => {
                console.error("에러 : " + err);
            });
    }, [list]);

    return (
        <div className="insertForm">
            {off && (
                <>
                    <input
                        type="text"
                        className="insert"
                        onChange={handleChange}
                        placeholder="  입력 후 , Enter "
                        onKeyPress={handleKeyPress}
                    />
                    <i onClick={save} className="plus fas fa-plus fa-2x"></i>
                </>
            )}
            {on && (
                <i
                    onClick={onToggle}
                    className="toggle fas fa-toggle-on fa-3x"
                ></i>
            )}
            {off && (
                <i
                    onClick={onToggle}
                    className="toggle fas fa-toggle-off fa-3x"
                ></i>
            )}
        </div>
    );
};

export default TodoCreate;
