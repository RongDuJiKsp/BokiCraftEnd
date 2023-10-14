

const ObjManager = {
    popLastAndReturnThis: function (Obj: any) {
        if (Obj.pop === undefined) return null;
        Obj.pop();
        return Obj;
    },
    outlineArray: function (arr: any[]): any {
        console.log(arr);
        if (arr === undefined) return null;
        let res: any = arr[0];
        for (let i = 1; i < arr.length; i++) {
            res = res + arr[i];
        }
        return res;
    }
}
export default ObjManager;