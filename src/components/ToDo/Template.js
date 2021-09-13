import React, { useState, useEffect, useRef } from "react";
import TodoCreate from "./TodoCreate.js";
import TodoList from "./TodoList.js";
import TodoCalendar from "./TodoCalendar.js";
import "../../css/Todo/TodoCalendar.css";
import "../../css/Todo/Template.css";
import axios from "axios";

const Template = () => {
    const [today, setToday] = useState("");
    const [list, setList] = useState([]);

    const testList = useRef([]);
    const [id,setId] = useState(1);

    const apiTodo = () => {
        // return new Promise((resolve, reject) => {
        let date = new Date();
        let Year = date.getFullYear();
        let Month = date.getMonth() + 1;
        if (Month < 10) {
            Month = "0" + Month;
        }
        let day = date.getDate();
        if (day < 10) {
            day = "0" + day;
        }
        setToday(`${Year}-${Month}-${day}`);
        // setInterval(() => {
        console.log("setInterval 작동");
        axios({
            url: "/api/todo",
            method: "post",
            params: {
                list: list,
            },
        })
            .then((response) => {
                setList(response.data);
                console.log(response.data);
                testList.current = response.data;
                console.log(
                    "/api/todo 첫번째 then testList : " + testList.current
                );
            })
            .catch((err) => {
                console.error("에러 : " + err);
            })
            .then(() => {
                console.log(list);
            });
        // });
    };

    useEffect(() => {
        apiTodo();
        // .then(() => {
        //     addCal();
        // });
        // }, 5000);
        // axios
        //     .get("api/todo/cal")
        //     .then((response) => {
        //         console.log(response);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
    }, []);

    const prev = () => {
        const _date = new Date(today);
        _date.setDate(_date.getDate() - 1);

        const cYear = _date.getFullYear();
        let cMonth = _date.getMonth() + 1;
        if (cMonth < 10) {
            cMonth = "0" + cMonth;
        }
        let cDay = _date.getDate();
        if (cDay < 10) {
            cDay = "0" + cDay;
        }
        const selday = `${cYear}-${cMonth}-${cDay}`;

        setToday(`${cYear}-${cMonth}-${cDay}`);
        console.log(selday);

        axios
            .get(`/api/todo?regdt=${cYear}-${cMonth}-${cDay}`)
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const next = () => {
        const _date = new Date(today);
        _date.setDate(_date.getDate() + 1);

        const cYear = _date.getFullYear();
        let cMonth = _date.getMonth() + 1;
        if (cMonth < 10) {
            cMonth = "0" + cMonth;
        }
        let cDay = _date.getDate();
        if (cDay < 10) {
            cDay = "0" + cDay;
        }

        setToday(`${cYear}-${cMonth}-${cDay}`);
        console.log(`${cYear}-${cMonth}-${cDay}`);

        axios
            .get(`/api/todo?regdt=${cYear}-${cMonth}-${cDay}`)
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div id="todo">
            <div id="template">
                <div id="head">
                    <i
                        className="fas fa-left fa-angle-left fa-2x"
                        onClick={prev}
                    ></i>
                    <h1 id="today">{today}</h1>
                    <i
                        className="fas fa-right fa-angle-right fa-2x"
                        onClick={next}
                    ></i>
                    <TodoCreate list={list} setList={setList} today={today} id={id} />
                </div>
                <TodoList list={list} setList={setList} today={today} />
            </div>
            <TodoCalendar today={today} setToday={setToday} />
        </div>
    );
};

export default Template;
