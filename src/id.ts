function* _idGenerator() {
    let i = 0;

    while (true) {
        yield ++i;
    }

    return i;
}

const idGenerator = _idGenerator();

export { idGenerator };

