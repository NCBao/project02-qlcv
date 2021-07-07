import React, { Component } from 'react';

class ContentTable extends Component{

	/*constructor(props){
		super(props);
	}*/

	onEdit = (id) => {
		this.props.onEdit(id);
	}

	onDelete = (id) => {
		this.props.onDelete(id);
	}

	render(){
		var content = 'empty', { tasks } = this.props;
		if(tasks && tasks.length !== 0){
			content = this.props.tasks.map((task,index) => {

				return (
					<tr key={ index+1 }>
						<td className="wd-5 center">{ index + 1 }</td>
						<td>{ task.name }</td>
						<td className="wd-6 center">
							<label className={ task.status ? "label label-success" : "label label-danger" }>
								{ task.status ? 'Active' : 'Deactive' }
							</label>
						</td>
						<td className="wd-18 center">
							<button className="btn btn-primary" /*data-id={ task.id }*/
								onClick={ () => this.onEdit(task.id) }
							>Edit</button>
							<button className="btn btn-danger mg-l-15" /*data-id={ task.id }*/
								onClick={ () => this.onDelete(task.id) }
							>Delete</button>
						</td>
					</tr>
				);
			});
			return(
				<div>
					<table className="table table-bordered table-hover">
						<thead>
							<tr>
								<th className="center">STT</th>
								<th className="center">Name</th>
								<th className="center">Status</th>
								<th className="center">Action</th>
							</tr>
						</thead>
						<tbody>
							{ content }
						</tbody>
					</table>
				</div>
			);
		}
		else{
			return(
				<div>
					<p>We don't have any task</p>
				</div>
			);
		}
	}
}

export default ContentTable;