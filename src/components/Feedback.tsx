import { useEffect, useState } from 'react';
import '../styles/feedback.scss';

interface SetMessageFeedback {
	message: string;
	sucess: boolean;
}

interface FeedbackProps {
	message: string;
	sucess: boolean;
	setMessageFeedback: ({ message, sucess }: SetMessageFeedback) => void
}

export function Feedback({ message, sucess, setMessageFeedback }: FeedbackProps) {

	const seconds = 5
	const [time, setTime] = useState<number>(seconds);

	useEffect(function() {
		console.log("oi");

		const secondsInterval = setInterval(function() {
			setTime(currentTime => {
				console.log(currentTime);
				if(currentTime == 0) {
					setTime(6);
					setMessageFeedback({ message: '', sucess: true })
					clearInterval(secondsInterval);
				}
				else if(currentTime >= 1) {
					return currentTime - 1;
				}
				else if(currentTime === 6) {
					return currentTime - 2;
				}
				return currentTime;
			});
		}, 1000);

	}, []);

	return (
		<div className=
			{`to-do__feedback ${time > 0 && time != 6 ? 'to-do__feedback--active' : ''} ${sucess ? 'to-do__feedback--sucess' : 'to-do__feedback--error' }`}>

			<p className="to-do__feedback-message">{message}</p>

			<div className="to-do__feedback-regressiva">
				<span style={{ width: `${time > 0 ? ((time / seconds) * 100) + '%' : '0%' }` }}></span>
			</div>
		</div>
	);
}
