const MisaFunction= {
     formatMoney:function(money) {
        if (!isNaN(money)) {
          var moneyInt = parseInt(money);
          return moneyInt
            .toString()
            .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1.");
        } else {
          return parseInt(money);
        }
      }
    
}
export default MisaFunction