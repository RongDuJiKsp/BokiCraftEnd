class Contribute {
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
    id:number;
    constructor(id: number, mainTag: string, othTag: string, showBase64: string, headBase64: string, userName: string, commitName: string, dateStr: string, liked: number, hasPicture: boolean, starCnt: number, commit: string) {
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
        this.id=id;
    }
}

export default Contribute;