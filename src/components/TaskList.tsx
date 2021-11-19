import { useState } from 'react';
import { Feedback } from './Feedback';
import { FiTrash, FiCheckSquare } from 'react-icons/fi';

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
	}

	function handleToggleTaskCompletion(taskId: number) {
		const newList = listTask.map(task => {
			if(task.id === taskId) {
				task.isComplete = !task.isComplete
				return task;
			};
			return task;
		});
		setListTask(newList);
	}

	function handleRemoveTask(taskId: number) {
		const newList = listTask.filter(task => task.id !== taskId);
		setListTask(newList);
	}

	return (
		<main className="to-do__main container">

			<Feedback
				message="to-do criado com sucesso"
				sucess={true}
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
