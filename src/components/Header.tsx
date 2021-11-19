import "../styles/header.scss"

export function Header() {

	return (
		<header className="to-do__header">
			<div>
				<img
					src="/logo.svg"
					alt="to-do"
					title="to-do"
					translate="no"
					className="to-do__header-image"
				/>
			</div>
		</header>
	)
}
