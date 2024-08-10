const Form = ({country, changeHandler}) => {
    return (
        <>
            find countries <input onChange={changeHandler}></input>
        </>
    )
}

export default Form