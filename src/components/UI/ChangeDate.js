export function changeDate(date){
    if(date){
        return date.toString().split('T')[0].split('-').reverse().join('-');
    }
}