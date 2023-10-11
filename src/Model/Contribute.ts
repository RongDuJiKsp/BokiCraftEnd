class Contribute {
    id: number;
    mainTag: string;
    othTag: string;
    showBase64: string;
    headBase64: string;
    userName: string;
    commitName: string;
    dateStr: string;
    liked: number;
    hasPicture: boolean;
    starCnt: number;
    commit: string;
    constructor(id: number, mainTag: string, othTag: string, showBase64: string, headBase64: string, userName: string, commitName: string, dateStr: string, liked: number, hasPicture: boolean, starCnt: number, commit: string) {
        this.id = id;
        this.mainTag = mainTag;
        this.othTag = othTag;
        this.showBase64 = showBase64;
        this.headBase64 = headBase64;
        this.userName = userName;
        this.commitName = commitName;
        this.dateStr = dateStr;
        this.liked = liked;
        this.hasPicture = hasPicture;
        this.starCnt = starCnt;
        this.commit = commit;
    }
}

export default Contribute;