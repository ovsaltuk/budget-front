interface IFormProps = {
    store: IFormStoreProps;
}

const Form = (store) => {
    

    return (<>
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" onChange={handleChange} />
            <input type="text" name="username" onChange={handleChange} />
            <button type="submit">submit</button>
        </form>
    </>)
}

export default Form;