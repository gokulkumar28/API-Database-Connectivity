using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MetroCardManagement
{
    public interface IBalance
    {
        public double Balance { get;  }

        //Method

        public double WalletRecharge(double vale);
        public double DeductBalance(double value);
    }
}