export function Varname(req,res,next) {
    let BlogTitle;
    let BlogContent ;
    var obj = {
      BlogTitle: BlogTitle,
      BlogContent: BlogContent
    }
    return obj
    next();
    
} 

export default Varname();