const setup404Responce = (message: string) => {
    const event = useRequestEvent();
    if (event) {
        setResponseStatus(event, 404, message);
    }
}

export default setup404Responce;