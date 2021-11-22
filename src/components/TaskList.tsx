import { useState } from 'react';
import { FiTrash, FiCheckSquare } from 'react-icons/fi';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../styles/tasklist.scss';

interface Task {
	id: number;
	title: string;
	isComplete: boolean;
}

export function TaskList() {

	const [listTask, setListTask] = useState<Task[]>([]);
	const [task, setTask] = useState('');
	
	function handleTask(event: React.ChangeEvent<HTMLInputElement>) {		
		if(event.target) { setTask(event.target.value); }
	}

	function handleCreateNewTask() {

		if(task.length <= 1) { return };

		let id:number = 0;
		let idCreate = false;

		do {
			id = Math.ceil(Math.random() * 100000);
			const isExist = listTask.find(task => task.id === id);
			if(!isExist) { idCreate = true };
		} while(idCreate === false);
		
		const newTask = { id, title: task, isComplete: false }
		setListTask([...listTask, newTask]);
		setTask('');
		toast.success(`to-do: ${newTask.title.slice(0, 15)}... criado`, {
			position: toast.POSITION.TOP_RIGHT
		});
	}

	function handleToggleTaskCompletion(taskId: number) {
		const newList = listTask.map(task => {
			if(task.id === taskId) {
				task.isComplete = !task.isComplete

				if(task.isComplete) {
					toast.success(`to-do: ${task.title.slice(0, 15)}... mudou para concluído`, {
						position: toast.POSITION.TOP_RIGHT
					});
				}
				else {
					toast.success(`to-do: ${task.title.slice(0, 15)}... mudou para não concluído`, {
						position: toast.POSITION.TOP_RIGHT
					});
				}
				return task;
			};
			return task;
		});
		setListTask(newList);
	}

	function handleRemoveTask(taskId: number) {
		const newList = listTask.filter(task => {
			if(task.id !== taskId) { return task };
			toast.success(`to-do ${task.title.slice(0, 15)}... removido`, {
				position: toast.POSITION.TOP_RIGHT
			});
		});
		setListTask(newList);
	}

	return (
		<main className="to-do__main container">

			<ToastContainer
				position="top-right"
				autoClose={2000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			
			<section className="to-do__main-header">

				<h1 className="to-do__main-header-title">Minhas tasks</h1>

				<div className="to-do__main-header__create-task">
					<input
						className="to-do__main-header__create-task-todo"
						type="text"
						value={task}
						onChange={handleTask}
					 	placeholder="adicionar novo to-do"
					/>
					<button
						className="to-do__main-header__create-task-button"
						onClick={handleCreateNewTask}
						onKeyUp={handleCreateNewTask}
					>
						<FiCheckSquare />
					</button>
				</div>

			</section>

			<section className="to-do__main-tasks">
				
				<ul className="to-do__main-tasks-list">
					
					{listTask.map(task => (
						<li className="to-do__main-tasks-list__item" key={task.id}>
							
							<div>

								<input
									className="to-do__main-tasks-list__item-iscomplete"
									type="checkbox"
									checked={task.isComplete ? true : false}
									onChange={() => handleToggleTaskCompletion(task.id)}
									id={`iscomplete-${task.id}`}
									name="iscomplete"
								/>
								<label
									htmlFor={`iscomplete-${task.id}`}
									className="to-do__main-tasks-list__item-title"
								>
									{task.title}
								</label>

							</div>

							<button
								className="to-do__main-tasks-list__item-button"
								onClick={() => handleRemoveTask(task.id)}
							>
								<FiTrash />
							</button>

						</li>
					))}

				</ul>

			</section>

		</main>
	);
}
