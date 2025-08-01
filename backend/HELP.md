# Getting Started

### Reference Documentation
For further reference, please consider the following sections:

* [Official Apache Maven documentation](https://maven.apache.org/guides/index.html)
* [Spring Boot Maven Plugin Reference Guide](https://docs.spring.io/spring-boot/3.4.5/maven-plugin)
* [Create an OCI image](https://docs.spring.io/spring-boot/3.4.5/maven-plugin/build-image.html)
* [Spring Data JPA](https://docs.spring.io/spring-boot/3.4.5/reference/data/sql.html#data.sql.jpa-and-spring-data)
* [Spring Security](https://docs.spring.io/spring-boot/3.4.5/reference/web/spring-security.html)
* [OAuth2 Authorization Server](https://docs.spring.io/spring-boot/3.4.5/reference/web/spring-security.html#web.security.oauth2.authorization-server)

### Guides
The following guides illustrate how to use some features concretely:

* [Accessing Data with JPA](https://spring.io/guides/gs/accessing-data-jpa/)
* [Securing a Web Application](https://spring.io/guides/gs/securing-web/)
* [Spring Boot and OAuth2](https://spring.io/guides/tutorials/spring-boot-oauth2/)
* [Authenticating a User with LDAP](https://spring.io/guides/gs/authenticating-ldap/)

### Maven Parent overrides

Due to Maven's design, elements are inherited from the parent POM to the project POM.
While most of the inheritance is fine, it also inherits unwanted elements like `<license>` and `<developers>` from the parent.
To prevent this, the project POM contains empty overrides for these elements.
If you manually switch to a different parent and actually want the inheritance, you need to remove those overrides.

learning/
├── domain/
│   ├── models/
│   │   ├── LearningMaterial.java                # Modelo de dominio
│   │   ├── LearningUnit.java
│   │   ├── MaterialView.java
│   │   ├── LearningMaterialsEntity.java        # Entidad JPA
│   │   ├── LearningUnitsEntity.java
│   │   └── MaterialViewsEntity.java
│   ├── repository/
│   │   ├── implementation/
│   │   │   ├── LearningMaterialRepositoryImpl.java
│   │   │   └── MaterialViewRepositoryImpl.java
│   │   │   └── LearningUnitRepositoryImpl.java
│   │   ├── abstraction/
│   │   │   ├── LearningMaterialRepository.java
│   │   │   └── MaterialViewRepository.java
│   │   │   └── LearningUnitRepository.java
│   └── service/
│       ├── LearningMaterialService.java         # Port de servicio
│       └── LearningUnitService.java
│
├── application/
│   ├── usecase/
│   │   ├── ManageLearningMaterialUseCase.java
│   │   ├── TrackMaterialViewUseCase.java
│   │   └── GetLearningMaterialUseCase.java
│   │   └── ManageLearningUnitUseCase.java
│   ├── ports/
│   │   ├── input/
│   │   │   ├── LearningMaterialInputPort.java
│   │   │   └── MaterialViewInputPort.java
│   │   │   └── LearningUnitInputPort.java
│   │   └── output/
│   │       ├── LearningMaterialOutputPort.java
│   │       └── MaterialViewOutputPort.java
│   │       └── LearningUnitOutputPort.java
│
└── infrastructure/
    └── dto/
    │       ├── request/
    │       │   ├── CreateMaterialRequest.java
    │       │   ├── CreateUnitRequest.java
    │       │   └── TrackViewRequest.java
    │       └── response/
    │           ├── LearningMaterialResponse.java
    │           ├── LearningUnitResponse.java
    │           └── MaterialViewResponse.java
    ├── rest/
    │   ├── LearningMaterialController.java
    │   └── LearningUnitController.java
    ├── adapter/
    │   ├── output/
    │   ├────├── jpa/
    │   │         └── LearningMaterialJpaRepository.java
    │   │         └── LearningUnitJpaRepository.java
    │   ├────├── mapper/
    │   │         └── LearningMaterialMapper.java
    │   │         └── LearningUnitMapper.java
    │   │   ├── LearningMaterialPersistenceAdapter.java
    │   │   └── LearningUnitPersistenceAdapter.java
    │   │   └── LocalFileStorageAdapter.java
    │   └── input/
    │       └── FileStorageAdapter.java
    └── exception/
    ├── MaterialNotFoundException.java
    └── GlobalExceptionHandler.java