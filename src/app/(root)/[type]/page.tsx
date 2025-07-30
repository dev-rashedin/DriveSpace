

const page = async({ params }: SearchParamProps) => {
  
  const type = (await params)?.type as string

  return (
    <div className="page-container">
      <section className="w-full">
        <h1 className='h1'>
          {type}
        </h1>
        <div className="total-size-section">
          <p className="body-1">
            Total : <span>{ } 0 MB</span>
          </p>
          <div className="sort-container">
            <p className="body-1 hidden text-light-200 sm:block">Sort by:</p>
          </div>
        </div>
      </section>
    </div>
  )
}
export default page