
function Accounts({ account }) {
    return (
        <>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{account.name}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">{account.balance}</h6>
                </div>
            </div>
        </>
    )
}

export default Accounts