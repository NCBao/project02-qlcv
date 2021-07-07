import React,{ Component } from 'react';

class UpdateForm extends Component{

	constructor(props){
		super(props);
		this.state = {
			task : {
				id : '',
				name : '',
				status : false
			},
			prevTaskProps : {

			}
		}
	}

	componentDidMount(){
		var { task } = this.props;
		this.setState({
			task : task
		});
	}

	static getDerivedStateFromProps(props, state){
		if( props.task !== state.prevTaskProps ){
			return {
				prevTaskProps : props.task,
				task : props.task
			}
		}
		else return null;
	}

	onCloseForm = () => {
		this.props.onCloseForm();
	}

	onSubmitForm = (e) => {
		e.preventDefault();
		var { task } = this.state;
		this.props.onSubmitForm(task);
	}

	onChange = (e) => {
		var name = e.target.name === 'txtName' ? 'name' : 'status';
		var value = name === 'name' ? e.target.value : e.target.checked;
		this.setState((prev) => ({
			task:{
				...prev.task,
				[name] : value
			}
		}));
	}
	
	render(){
		var { task } = this.state;
		return(
			<div>
				<div className={ task.id === '' ? "panel panel-primary" : "panel panel-warning" }>
					<div className="panel-heading">
						<h3 className="panel-title">{ task.id === '' ? 'Add work' : 'Edit work' }
							<span className="pull-right cursor-pointer"
								onClick={ this.onCloseForm }
							><i className="glyphicon glyphicon-remove-sign"></i></span>
						</h3>
					</div>
					<div className="panel-body">
						<form 
							onSubmit={ this.onSubmitForm }
						>
							<div className="form-group">
								<label>Name:</label>
								<input type="text" className="form-control" name="txtName" 
									onChange={ this.onChange }
									value={ task.name }
								/>
							</div>
							<div className="form-group">
								<label>Status:</label>
								<div className="checkbox">
									<label className="user-select-none">
										<input type="checkbox" name="chkStatus" 
											onChange={ this.onChange }
											checked={ task.status }
										/>
										Active
									</label>
								</div>
							</div>
							{/*<div className="form-group">*/}
								<button type="submit" className="btn btn-primary">Save</button>
								<button type="reset" className="btn btn-warning mg-l-15">Reset</button>
							{/*</div>*/}
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default UpdateForm;