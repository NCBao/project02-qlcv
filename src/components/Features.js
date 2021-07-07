import React,{ Component } from 'react';

class Features extends Component{

	/*constructor(props){
		super(props);
	}*/

	onGenerateData = () => {
		this.props.onGenerateData();
	}

	onAdd = () => {
		this.props.onAdd();
	}

	onSearch = () => {
		var txtSearch = document.getElementById('search-box');
		this.props.onSearch(txtSearch.value);
	}

	onEnter = (e) => {
		if(e.which === 13){
			this.onSearch();
		}
	}

	onSort = (e) => {
		this.props.onSort(parseInt(e.target.value));
	}

	render(){
		return(
			<div className="form-group">
				<button className="btn btn-primary"
					onClick={ this.onAdd }
				>Add</button>
				<button className="btn btn-success mg-l-15"
					onClick={ this.onGenerateData }
				>Generate data</button>
				<div className="wd-50 dp-inline mg-l-15">
					<input id="search-box" className="form-control dp-inline wd-80" type="text" placeholder="Search box"
						onKeyPress={ this.onEnter }
					/>
					<button className="btn btn-primary"
						onClick={ this.onSearch }
					>Search</button>
				</div>
				<div className="dp-inline mg-l-15 min-200">
					<label>Sort:&nbsp;</label>
					<select className="form-control max-160 dp-inline"
						onChange={ this.onSort }
					>
						<option value="0">A-Z</option>
						<option value="1">Z-A</option>
						<option value="2">Active - Deactive</option>
						<option value="3">Deactive - Active</option>
					</select>
				</div>
			</div>
		);
	}
}

export default Features;