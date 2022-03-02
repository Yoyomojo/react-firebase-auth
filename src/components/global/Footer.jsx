const Footer = () => {
    const getYear = new Date().getFullYear();

    return (
        <footer>
            <div className='container-fluid'>
                <div className="row pt-5 pb-3">
                    <div className='col my-auto'>
                        <p className="text-center">Copyright &copy;{getYear} {process.env.REACT_APP_SITE_NAME}. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;