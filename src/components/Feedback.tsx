import '../styles/feedback.scss';

interface FeedbackProps {
	message: string,
	sucess: boolean
}

export function Feedback({ message, sucess }: FeedbackProps) {

	return (
		<div className={`to-do__feedback to-do__feedback--active ${sucess ? 'to-do__feedback--sucess' : 'to-do__feedback--error' }`}>

			<p className="to-do__feedback-message">{message}</p>

			<div className="to-do__feedback-regressiva">
				<span style={{ width: '100%' }}></span>
			</div>
		</div>
	);
}
