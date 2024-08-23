// export const formatDate = (date: Date): string => {
//     const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
//     return date.toLocaleDateString('en-CA', options);
//   };
export const formatDate = (date: Date | string): string => {
    if (!date) return '';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) return '';
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };
  
  
// export const calculateAge = (date: Date): number => {
//     const birthDate = new Date(date);
//     const today = new Date();
//     let age = today.getFullYear() - birthDate.getFullYear();
//     const monthDiff = today.getMonth() - birthDate.getMonth();
//     if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
//       age--;
//     }
//     return age;
//   };

export const calculateAge = (dateOfBirth: Date | string): number | undefined => {
    if (!dateOfBirth) return undefined; 
  
    const birthDate = typeof dateOfBirth === 'string' ? new Date(dateOfBirth) : dateOfBirth;
    
    if (isNaN(birthDate.getTime())) return undefined;
    
    const today = new Date();
    const birthYear = birthDate.getFullYear();
    const birthMonth = birthDate.getMonth();
    const birthDay = birthDate.getDate();
    
    const age = today.getFullYear() - birthYear;
    
    if (
      today.getMonth() < birthMonth ||
      (today.getMonth() === birthMonth && today.getDate() < birthDay)
    ) {
      return age - 1;
    } else {
      return age;
    }
  };

  export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);
  };
  
  export const parseCurrency = (formatted: string) => {
    return parseFloat(formatted.replace(/[^0-9.-]+/g, ''));
  };

  export const calculatePercentageChange = (oldValue: number, newValue: number) => {
    if (oldValue === 0) return { percentage: 0, isIncreasing: true }; 

    const percentageChange = ((newValue - oldValue) / oldValue) * 100;
    const isIncreasing = percentageChange > 0;

    return { percentage: Math.abs(percentageChange), isIncreasing };
  };
