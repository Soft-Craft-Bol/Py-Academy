package com.pyAcademy.pyAcademy;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import com.pyAcademy.pyAcademy.features.education.application.usecase.StudentUseCaseTests;
@SpringBootTest
class PyAcademyApplicationTests {

	@Test
	void contextLoads() {
		StudentUseCaseTests StudentUseCaseTests = new StudentUseCaseTests();
	}
	
	

}
