import React, { Component } from 'react';
import './App.css';
import UpdateForm from './components/UpdateForm';
import ContentTable from './components/ContentTable';
import Features from './components/Features';

class App extends Component{

    constructor(props){
        super(props);
        this.state = {
            tasks : [],
            formStatus : false,
            task : {

            },
            editingTaskIndex : 0,
            taskFilter : []
        }
    }

    generateTasks = () => {
        var newTasks = [
            {
                id: this.createRandomID(),
                name: 'Học ReactJS',
                status : true
            },
            {
                id: this.createRandomID(),
                name: 'Ngủ',
                status : true
            },
            {
                id: this.createRandomID(),
                name: 'Chơi game',
                status : false
            },
            {
                id: this.createRandomID(),
                name: 'Học NodeJS',
                status : true
            }
        ];
        this.setState({
            tasks : newTasks,
            taskFilter : newTasks
        });
        this.setToLocalStorage(newTasks);
    }

    crs(){
        return Math.floor(1 + Math.random() * 0x10000).toString(16).substring(1);
    }

    createRandomID = () => {
        return this.crs() + this.crs() +'-'+this.crs()+'-'+this.crs()+this.crs()+this.crs()+'-'+this.crs();
    }

    setToLocalStorage = (params) => {
        localStorage.setItem('tasks',JSON.stringify(params));
    }

    componentDidMount(){
        //life cycle
        if( localStorage != null && localStorage.tasks != null ){
            var listTasks = JSON.parse(localStorage.tasks);
            this.setState({
                tasks : listTasks,
                taskFilter : listTasks
            });
            setTimeout(() => {
                this.onSort(0);
            },10);
            console.log('restore data from local');
        }
        else {
            console.log('local is empty');
        }
    }

    onGenerateData = () => {
        this.generateTasks();
    }

    onOpenForm = () => {
        this.setState({
            formStatus : true
        });
    }

    onCloseForm = () => {
        this.setState({
            formStatus  : false
        });
    }

    makeEmptyTask = () => {
        this.setState({
            task : {
                id : '',
                name : '',
                status : false
            },
            editingTaskIndex: -1
        });
    }

    saveUpdateTask = (task) => {
        var { tasks, editingTaskIndex, taskFilter } = this.state;
        if(task.id === ''){
            task.id = this.createRandomID();
            tasks.push(task);
        }
        else{
            tasks[editingTaskIndex] = task;
        }
        if( tasks === taskFilter ){
            this.setState({
                tasks : tasks,
                taskFilter : tasks
            });
        }
        else{
            this.setState({
                tasks : tasks
            });
        }
        this.setToLocalStorage(tasks);
        this.onCloseForm();
    }

    findTaskIndex = (id) => {
        var { tasks } = this.state;
        var listTaskID = tasks.map((task, index) => {
            return task.id;
        });
        return listTaskID.indexOf(id);
    }

    findTasks = (key) => {
        var { tasks } = this.state;
        var listTaskFilter = [];
        tasks.forEach((task, index) => {
            var str = this.convertString(task.name);
            if(str.toLowerCase().includes(key.toLowerCase())){
                listTaskFilter.push(task);
            }
        });
        return listTaskFilter;
    }

    filterTask = (status) => {
        var { taskFilter } = this.state;
        var tasksResult = [];
        taskFilter.forEach((task, index) => {
            if(task.status === status){
                tasksResult.push(task);
            }
        });
        tasksResult.sort((firstItem, secondItem) => {
            return firstItem.name.localeCompare(secondItem.name);
        });
        console.log(tasksResult);
    }

    convertString(str) {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        return str;
    }

    onAdd = () => {
        this.onOpenForm();
        this.makeEmptyTask();
    }

    onSubmitForm = (task) => {
        this.saveUpdateTask(task);
    }

    onDelete = (id) => {
        var index = this.findTaskIndex(id);
        var { tasks } = this.state;
        tasks.splice(index, 1);
        this.setState({
            tasks : tasks
        });
        this.setToLocalStorage(tasks);
        alert('Xóa thành công');
    }

    onEdit = (id) => {
        var index = this.findTaskIndex(id);
        var task = this.state.tasks[index];
        this.setState({
            task : task,
            editingTaskIndex : index
        });
        this.onOpenForm();
    }

    onSearch = (key) => {
        var listTaskFilter = this.findTasks(key);
        this.setState({
            taskFilter : listTaskFilter
        });
    }

    onSort = (value) => {
        var { taskFilter } = this.state;
        switch(value){
            case 0: {
                taskFilter.sort((firstItem, secondItem) => {
                        return firstItem.name.localeCompare(secondItem.name);
                    }
                );
                break;
            }
            case 1: {
                taskFilter.sort((secondItem, firstItem) => {
                        return firstItem.name.localeCompare(secondItem.name);
                    }
                );
                break;
            }
            case 2: {
                taskFilter.sort((firstItem, secondItem) => {
                        if( firstItem.status === secondItem.status === true) return 0;
                        else if( firstItem.status === true && secondItem.status === false )
                            return -1;
                        else return 1;
                    }
                );
                break;
            }
            case 3: {
                taskFilter.sort((secondItem, firstItem) => {
                        if( firstItem.status === secondItem.status === true) return 0;
                        else if( firstItem.status === true && secondItem.status === false )
                            return -1;
                        else return 1;
                    }
                );
                break;
            }
            default:{
                break;
            }
        }
        this.setState({
            taskFilter : taskFilter
        });
    }

    render(){
        var { formStatus, task, taskFilter } = this.state;
        var elmUpdateForm = formStatus ? (
            <UpdateForm
                task={ task }
                onCloseForm={ this.onCloseForm }
                onSubmitForm={ this.onSubmitForm }
            />
        ) : '';
        return(
            <div className="mg-30 row" id="wrapper">
                <p className="title">project 02: quản lý công việc</p>
                <div className={ formStatus ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : "" }>
                    { elmUpdateForm }
                </div>
                <div className={ formStatus ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "" }>
                    <Features
                         onGenerateData={ this.onGenerateData }
                         onAdd={ this.onAdd }
                         onSearch={ this.onSearch }
                         onSort={ this.onSort }
                    />
                    <ContentTable
                        tasks={ taskFilter }
                        onDelete={ this.onDelete }
                        onEdit={ this.onEdit }
                    />
                </div>
            </div>
        );
    }
}

export default App;
