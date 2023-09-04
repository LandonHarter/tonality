const userCache: { [uid: string]: any } = {};
export async function getUserData(uid: string, useCache: boolean = true) {
    if (useCache && userCache[uid]) {
        return userCache[uid];
    }

    return null;
}