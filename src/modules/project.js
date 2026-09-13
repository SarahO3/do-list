export function Project(name){

    const id = crypto.randomUUID()
    return {
        id,
        name
    }
}