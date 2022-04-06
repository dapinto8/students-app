import type { GetServerSideProps } from 'next'
import Student from '@components/Student'
import styles from '@styles/Home.module.css'
import { studentServiceFactory } from '@services/student-factory.service'
import SchoolHeader from '@components/SchoolHeader'

const Home = ({ student }) => {
  return (
    <main>
      {student && (
        <>
          <SchoolHeader school={student.school} />
          <div className={styles.container}>
            <Student student={student} />
          </div>
        </>
      )}
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const StudentSevice = studentServiceFactory()
  // The id should be a dynamic value from the URL
  // But for the sake of this example, we will use a static value
  const id = '3b35fb50-3d5e-41b3-96d6-c5566141fab0'
  const student = await StudentSevice.getStudent(id)

  return {
    props: {
      student: student.toObject()
    }
  }
}

export default Home
