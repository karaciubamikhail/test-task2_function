export function TodoInput({item, handleChange, handleSubmit, editItem}){
    return (
        <div className="card card-body my-3">
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text bg-info text-white">
                            <i className="fas fa-book" />
                        </div>
                    </div>

                    <input
                        type="text"
                        className="form-control"
                        placeholder="New Todo"
                        value={item}
                        onChange={handleChange}
                    />
                </div>

                <button 
                    type="submit"
                    className={`btn btn-block mt-3 ${editItem ? 'btn-success' : 'btn-info'}`}
                >
                {editItem ? 'Edit task' : 'Add new task'}
                </button>
            </form>
        </div>
    )
}
