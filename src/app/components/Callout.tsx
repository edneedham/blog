export function Callout({ children, type = 'info' }: { children: React.ReactNode; type?: 'info' | 'warning' | 'success' }) {
    const colors = {
      info: 'bg-blue-50 border-blue-200 text-blue-900',
      warning: 'bg-yellow-50 border-yellow-200 text-yellow-900',
      success: 'bg-green-50 border-green-200 text-green-900',
    };
  
    return (
      <div className={`border-l-4 p-4 my-4 ${colors[type]}`}>
        {children}
      </div>
    );
  }