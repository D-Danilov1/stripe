import LangProvider from './LangProvider/LangProvider'

const MainProvider = ({ children, Component }: any) => {
	return <LangProvider>{children}</LangProvider>
}

export default MainProvider
